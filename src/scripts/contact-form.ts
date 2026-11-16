/**
 * Behaviour for the guided contact form (src/components/ContactForm.astro).
 *
 * Spam handling is server-side: the honeypot field (`_gotcha`) is sent to Formspree
 * as-is and Formspree discards those submissions. Nothing is dropped in the browser,
 * so a fast human (or password-manager autofill) is never silently ignored.
 */
const formEl = document.getElementById('contact-form') as HTMLFormElement | null;

if (formEl) {
    // Re-bind as a non-nullable const so hoisted function declarations below type-check.
    const form: HTMLFormElement = formEl;
    const DRAFT_KEY = 'sbk-contact-draft';
            let hideTimer: number | undefined;
    let saveTimer: number | undefined;
    let step = 1;

    type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    const $ = <T extends HTMLElement>(sel: string) => form.querySelector<T>(sel)!;
    const result = $('#form-result');
    const body = $('#form-body');
    const success = $('#success');
    const service = $<HTMLSelectElement>('#service');
    const steps = Array.from(form.querySelectorAll<HTMLElement>('.step'));
    const sets = Array.from(form.querySelectorAll<HTMLElement>('.question-set'));
    const briefGroup = $('[data-mode="brief"]');
    const commonSet = $('.common-set');
    const progress = $('#progress');
    const progressLabel = $('#progress-label');
    const progressFill = $('#progress-fill');
    const progressTrack = $('.progress-track');
    const draftNote = $('#draft-note');
    const btnBack = $<HTMLButtonElement>('#btn-back');
    const btnNext = $<HTMLButtonElement>('#btn-next');
    const btnSubmit = $<HTMLButtonElement>('#btn-submit');

    const isDetailed = () =>
        form.querySelector<HTMLInputElement>('input[name="enquiry_type"]:checked')?.value === 'Detailed project brief';
    const totalSteps = () => (isDetailed() ? 3 : 1);

    function show(message: string, color: string) {
        window.clearTimeout(hideTimer);
        result.textContent = message;
        result.style.display = 'block';
        result.style.color = color;
    }

    // Fields in hidden groups are also disabled, so they are neither validated nor sent.
    function toggle(el: Element, on: boolean) {
        (el as HTMLElement).hidden = !on;
        el.querySelectorAll<Field>('input, select, textarea').forEach((f) => {
            f.disabled = !on;
            if (!on) clearError(f);
        });
    }

    function update() {
        const detailed = isDetailed();
        const chosen = service.value;
        form.classList.toggle('is-detailed', detailed);
        toggle(briefGroup, !detailed);
        sets.forEach((s) => toggle(s, detailed && s.dataset.service === chosen));
        toggle(commonSet, detailed && chosen !== '');
        draftNote.hidden = !detailed;
        if (step > totalSteps()) step = 1;
        showStep(step, false);
    }

    function showStep(n: number, moveFocus: boolean) {
        step = n;
        const total = totalSteps();
        const detailed = isDetailed();
        steps.forEach((s) => (s.hidden = Number(s.dataset.step) !== n));
        progress.hidden = !detailed;
        if (detailed) {
            const title = steps[n - 1].dataset.title ?? '';
            progressLabel.textContent = `Step ${n} of ${total}: ${title}`;
            progressFill.style.width = `${(n / total) * 100}%`;
            progressTrack.setAttribute('aria-valuenow', String(n));
        }
        btnBack.hidden = n === 1;
        btnNext.hidden = n === total;
        btnSubmit.hidden = n !== total;
        if (moveFocus) {
            form.closest('.form-container')?.scrollIntoView({ block: 'start' });
            steps[n - 1].querySelector<HTMLElement>('.step-title')?.focus({ preventScroll: true });
        }
    }

    // ---------- validation ----------
    function clearError(f: Field) {
        f.removeAttribute('aria-invalid');
        const err = f.parentElement?.querySelector('.field-error');
        if (err) {
            f.setAttribute('aria-describedby', (f.getAttribute('aria-describedby') ?? '').split(' ').filter((id) => id && id !== err.id).join(' '));
            if (!f.getAttribute('aria-describedby')) f.removeAttribute('aria-describedby');
            err.remove();
        }
    }

    function setError(f: Field, message: string) {
        clearError(f);
        f.setAttribute('aria-invalid', 'true');
        const err = document.createElement('p');
        err.className = 'field-error';
        err.id = `err-${f.id}`;
        err.setAttribute('role', 'alert');
        err.textContent = message;
        f.insertAdjacentElement('afterend', err);
        f.setAttribute('aria-describedby', `${f.getAttribute('aria-describedby') ?? ''} ${err.id}`.trim());
    }

    function checkField(f: Field): boolean {
        if (f.disabled || !f.required) return true;
        const value = f.value.trim();
        let message = '';
        if (value === '') message = f.dataset.error || 'This field is required.';
        else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) message = f.dataset.error || 'Please enter a valid email address.';
        if (message) {
            setError(f, message);
            return false;
        }
        clearError(f);
        return true;
    }

    function validateStep(n: number): boolean {
        const fields = Array.from(steps[n - 1].querySelectorAll<Field>('input, select, textarea'));
        let firstBad: Field | undefined;
        for (const f of fields) {
            if (!checkField(f) && !firstBad) firstBad = f;
        }
        firstBad?.focus();
        return !firstBad;
    }

    form.addEventListener('focusout', (e) => {
        const f = e.target as Field;
        if (f.matches?.('input, select, textarea') && f.required && f.value.trim() !== '') checkField(f);
    });

    form.addEventListener('input', (e) => {
        const f = e.target as Field;
        if (f.getAttribute?.('aria-invalid') === 'true') clearError(f);
        if (f instanceof HTMLTextAreaElement) {
            f.style.height = 'auto';
            f.style.height = `${f.scrollHeight}px`;
        }
        queueSave();
    });

    form.addEventListener('change', (e) => {
        const t = e.target as HTMLElement;
        if (t.matches('input[name="enquiry_type"]') || t.id === 'service') update();
        queueSave();
    });

    // ---------- draft autosave (per device) ----------
    function queueSave() {
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(saveDraft, 400);
    }

    function saveDraft() {
        if (!success.hidden) return;
        try {
            const data: Record<string, string> = {};
            form.querySelectorAll<Field>('input[name], select[name], textarea[name]').forEach((f) => {
                if (f.name === '_gotcha') return;
                if (f instanceof HTMLInputElement && f.type === 'radio') {
                    if (f.checked) data[f.name] = f.value;
                } else if (f.value) {
                    data[f.name] = f.value;
                }
            });
            localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
        } catch {}
    }

    function clearDraft() {
        try {
            localStorage.removeItem(DRAFT_KEY);
        } catch {}
    }

    function restoreDraft() {
        try {
            const raw = localStorage.getItem(DRAFT_KEY);
            if (!raw) return;
            const data = JSON.parse(raw) as Record<string, string>;
            for (const [name, value] of Object.entries(data)) {
                form.querySelectorAll<Field>(`[name="${name}"]`).forEach((f) => {
                    if (f instanceof HTMLInputElement && f.type === 'radio') f.checked = f.value === value;
                    else f.value = value;
                });
            }
            form.querySelectorAll('textarea').forEach((t) => {
                t.style.height = 'auto';
                if (t.value) t.style.height = `${t.scrollHeight}px`;
            });
        } catch {}
    }

    // ---------- navigation ----------
    btnNext.addEventListener('click', () => {
        if (validateStep(step)) showStep(step + 1, true);
    });
    btnBack.addEventListener('click', () => showStep(step - 1, true));

    $('#btn-again').addEventListener('click', () => {
        success.hidden = true;
        body.hidden = false;
        step = 1;
        update();
        form.closest('.form-container')?.scrollIntoView({ block: 'start' });
    });

    // ---------- submit ----------
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (btnSubmit.disabled) return;

        // Enter on an earlier step moves forward instead of submitting.
        if (step < totalSteps()) {
            if (validateStep(step)) showStep(step + 1, true);
            return;
        }
        if (!validateStep(step)) return;

        const entries = new FormData(form); // excludes disabled fields
        const name = String(entries.get('name') ?? '').trim();
        const firstName = name.split(/\s+/)[0] || 'there';
        // Send human-readable labels so the notification email reads like a brief.
        const payload: Record<string, string> = {};
        for (const [key, value] of entries) {
            if (typeof value !== 'string' || value.trim() === '') continue;
            const field = form.querySelector<HTMLElement>(`[name="${key}"]`);
            payload[field?.dataset.label || key] = value.trim();
        }
        payload['email'] = String(entries.get('email') ?? '').trim();
        payload['_subject'] = `${isDetailed() ? 'Detailed brief' : 'Enquiry'}: ${service.value} (${name || 'unknown'})`;

        btnSubmit.disabled = true;
        const label = btnSubmit.textContent;
        btnSubmit.textContent = 'Sending...';
        show('', 'inherit');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                finish(firstName);
            } else if (Array.isArray(data.errors)) {
                show(data.errors.map((err: { message: string }) => err.message).join(', '), '#ef4444');
            } else {
                show('There was a problem submitting your enquiry. Please try again, or contact me on WhatsApp.', '#ef4444');
            }
        } catch {
            show('Your enquiry could not be sent. Please check your connection and try again, or contact me on WhatsApp.', '#ef4444');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = label;
            hideTimer = window.setTimeout(() => {
                result.style.display = 'none';
            }, 10000);
        }
    });

    function finish(firstName: string) {
        clearDraft();
        form.reset();
        form.querySelectorAll('textarea').forEach((t) => (t.style.height = ''));
        step = 1;
        update();
        result.style.display = 'none';
        $('#success-title').textContent = `Thank you, ${firstName}.`;
        body.hidden = true;
        success.hidden = false;
        form.closest('.form-container')?.scrollIntoView({ block: 'start' });
        success.focus({ preventScroll: true });
    }

    restoreDraft();
    update();
}

export {};
