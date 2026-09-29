<div align="center">

# ⚡ SBK.dev — Personal Portfolio & Systems Engineering Showcase

**Sibongakonke Simamane** — *Full-Stack Systems Developer & Cloud Infrastructure Engineer (AWS)*  
Based in Durban, South Africa · Diploma HDIPSD2 (Distinction) · CompTIA Security+ & A+

[🌐 Live Website](https://sibongakonke-simamane.dev) • [📄 Download CV](https://sibongakonke-simamane.dev/Sibongakonke_Simamane_CV.pdf) • [💼 LinkedIn](https://www.linkedin.com/in/sibongakonke-simamane-371ba7236) • [💬 WhatsApp](https://wa.me/27694298444)

---

![Astro](https://img.shields.io/badge/Astro-5.0-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_Cloud-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![PHP](https://img.shields.io/badge/PHP_8-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL_3NF-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

</div>

---

## 📌 Executive Overview

This repository powers **[sbk.dev](https://sibongakonke-simamane.dev)** — the personal web portfolio and technical showcase for **Sibongakonke Simamane**. 

Engineered with **Astro 5** and **React 19**, the site features high-performance static rendering, dark-theme aesthetics, interactive system architecture flowcharts, responsive skill matrices, and structured technical case studies.

### Core Technical Pillars:
- **Full-Stack Systems Development**: Backend engineering in PHP 8, Java, C, and Node.js with 3NF normalized MySQL database architectures.
- **Security & Operational Resilience**: Field-level AES-256-GCM encryption, POPIA/DSAR compliance tools, Content Security Policy (CSP) nonces, CSRF protection, and rate-limiting middleware.
- **AWS Cloud Infrastructure (Active Learning)**: Hands-on VPC subnet zoning, EC2 instance provisioning, Nginx reverse proxy tuning, and automated zero-downtime GitHub Actions CI/CD pipelines.

---

## 📐 System Architecture Overview

### Asante Financial Services Application Engine
```
[ Borrower Portal / Web Client ]
               │
               ▼  (Security Middleware: CSP Nonce + CSRF + RateLimiter)
[ PHP 8 Core Engine & Auth ]
               │
               ▼  (PiiEncryptor: AES-256-GCM + Blind Index _hash)
[ MySQL 3NF Database ]
```

### Production AWS Cloud Infrastructure Topology
```
[ User Request / Route 53 DNS ]
               │
               ▼  (HTTPS / Port 443 SSL Termination)
[ AWS Application Load Balancer ]
               │
               ▼  (Private Subnet Routing)
[ EC2 Instances / Docker Containers ] ◄── (GitHub Actions CI/CD Pipeline)
```

---

## 🚀 Technical Features of the Website

- ⚡ **Ultra-Fast Static Site Generation**: Built using Astro 5 with sub-second page loads and automated XML sitemap generation.
- 🎨 **Deep Purple & Amber Theme System**: Dynamic dark-mode palette with interactive ambient background elements.
- 📐 **Visual System Flowcharts**: Responsive architecture diagram canvas displaying pipeline data movement across microservice layers.
- 🔍 **Technical Deep-Dive Accordions**: Collapsible technical specs detailing schema design, security focus, and operational deliverables.
- 📱 **100% Responsive & Accessible**: WCAG AA color contrast compliance, keyboard nav support, and structured SEO metadata.

---

## 🛠️ Project Structure

```
sbk-dev/
├── src/
│   ├── components/       # Astro & React UI components (Hero, Nav, Projects, Skills)
│   ├── content/blog/     # Technical markdown writing & engineering articles
│   ├── data/             # Site configuration, project metadata & tech stack definitions
│   ├── layouts/          # Base HTML layout, SEO meta tags & JSON-LD structured data
│   ├── pages/            # Astro static routes (Index, Writing, CV, Error pages)
│   └── styles/           # Design system tokens & CSS styling rules
├── public/               # Static assets (Favicons, OpenGraph card, CV PDF)
└── astro.config.mjs      # Astro framework setup & sitemap integration
```

---

## 💻 Local Development Setup

### Prerequisites
- Node.js `v22.x` or higher
- npm `v10.x` or higher

### Installation & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sivuhsGorha/sivuhsGorha.github.io.git
   cd sivuhsGorha.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

4. **Verify production build:**
   ```bash
   npx astro build
   ```

---

## 📬 Contact & Connectivity

- **Email**: [simangalisoblessed@gmail.com](mailto:simangalisoblessed@gmail.com)
- **Phone**: [+27 74 357 2309](tel:+27743572309)
- **WhatsApp**: [+27 69 429 8444](https://wa.me/27694298444)
- **GitHub**: [github.com/sivuhsGorha](https://github.com/sivuhsGorha)
- **LinkedIn**: [linkedin.com/in/sibongakonke-simamane-371ba7236](https://www.linkedin.com/in/sibongakonke-simamane-371ba7236)

---

<div align="center">
  <sub>Designed & Engineered by <strong>Sibongakonke Simamane</strong> · Powered by Astro & GitHub Pages</sub>
</div>
