import React, { useState, useMemo } from 'react';
import { techCategories, filterTabs } from '../data/techStack';

export default function TechStackGrid() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredCategories = useMemo(() => {
        if (activeTab === 'all') return techCategories;
        return techCategories.filter(cat => cat.filterGroup === activeTab);
    }, [activeTab]);

    return (
        <div className="tech-stack-container">
            {/* Filter Tabs */}
            <div className="tech-stack-tabs" role="tablist" aria-label="Tech Stack Category Filters">
                {filterTabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`tech-tab-btn ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Grid of Categories and Badges */}
            <div className="tech-stack-grid">
                {filteredCategories.map((cat) => (
                    <div
                        key={cat.id}
                        className="tech-category-card"
                    >
                        <div className="tech-card-header">
                            <div className="tech-card-title-row">
                                <h3 className="tech-category-title">{cat.title}</h3>
                                <span className="tech-badge-count">
                                    {cat.badges.length > 0 ? `${cat.badges.length} tools` : 'overview'}
                                </span>
                            </div>
                            {cat.description && (
                                <p className="tech-category-desc">{cat.description}</p>
                            )}
                        </div>

                        {/* Badges Flow */}
                        {cat.badges.length > 0 && (
                            <div className="tech-badges-flow">
                                {cat.badges.map((badge, idx) => (
                                    <div
                                        key={idx}
                                        className="tech-badge-item"
                                        title={`${badge.name}: ${badge.note || ''}`}
                                    >
                                        <div className="badge-shield-wrap">
                                            <img
                                                src={badge.badgeUrl}
                                                alt={`${badge.name} badge`}
                                                loading="lazy"
                                                className="badge-shield-img"
                                            />
                                        </div>
                                        {badge.note && (
                                            <span className="badge-item-note">{badge.note}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Structured details list if present */}
                        {cat.bullets && cat.bullets.length > 0 && (
                            <div className="tech-details-wrap">
                                <ul className="tech-details-list">
                                    {cat.bullets.map((bullet, bIdx) => (
                                        <li key={bIdx}>
                                            <span className="bullet-dash" aria-hidden="true">—</span>
                                            <span className="bullet-text">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style>{`
                .tech-stack-container {
                    width: 100%;
                    margin-top: 28px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .tech-stack-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid var(--line, #33465c);
                }

                .tech-tab-btn {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 14px;
                    padding: 8px 16px;
                    border-radius: 3px;
                    background: transparent;
                    color: var(--steel, #a9bcdc);
                    border: 1px solid rgba(227, 168, 87, 0.2);
                    cursor: pointer;
                    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
                }

                .tech-tab-btn:hover {
                    color: var(--paper, #ffffff);
                    border-color: var(--amber, #e3a857);
                    background: rgba(227, 168, 87, 0.08);
                }

                .tech-tab-btn.active {
                    background: var(--amber, #e3a857);
                    color: var(--ink, #0f1b2d);
                    border-color: var(--amber, #e3a857);
                    font-weight: 600;
                }

                .tech-stack-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 20px;
                }

                @media (max-width: 640px) {
                    .tech-stack-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .tech-category-card {
                    background: rgba(14, 10, 20, 0.6);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: 1px solid rgba(227, 168, 87, 0.18);
                    border-radius: 6px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
                    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
                }

                .tech-category-card:hover {
                    border-color: rgba(227, 168, 87, 0.55);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 28px rgba(227, 168, 87, 0.1);
                }

                .tech-card-header {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .tech-card-title-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }

                .tech-category-title {
                    font-family: 'Fraunces', serif;
                    font-size: 23px;
                    font-weight: 500;
                    color: var(--paper, #ffffff);
                    margin: 0;
                }

                .tech-badge-count {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 12px;
                    color: var(--amber-dim, #b98640);
                    border: 1px solid rgba(227, 168, 87, 0.25);
                    padding: 2px 8px;
                    border-radius: 3px;
                    text-transform: lowercase;
                    letter-spacing: 0.02em;
                }

                .tech-category-desc {
                    font-size: 15px;
                    color: var(--steel, #a9bcdc);
                    margin: 0;
                    line-height: 1.55;
                }

                .tech-badges-flow {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .tech-badge-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    background: rgba(14, 10, 20, 0.7);
                    border: 1px solid rgba(227, 168, 87, 0.16);
                    border-radius: 4px;
                    padding: 10px 12px;
                    transition: border-color 0.15s ease, background 0.15s ease;
                }

                .tech-badge-item:hover {
                    background: rgba(227, 168, 87, 0.06);
                    border-color: rgba(227, 168, 87, 0.45);
                }

                .badge-shield-wrap {
                    display: flex;
                    align-items: center;
                }

                .badge-shield-img {
                    height: 24px;
                    max-height: 24px;
                    border-radius: 2px;
                    display: inline-block;
                }

                .badge-item-note {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 13px;
                    color: var(--steel, #a9bcdc);
                    line-height: 1.45;
                    margin-top: 2px;
                }

                .tech-details-wrap {
                    border-top: 1px solid rgba(227, 168, 87, 0.15);
                    padding-top: 14px;
                }

                .tech-details-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .tech-details-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    font-size: 14.5px;
                    color: var(--steel, #a9bcdc);
                    line-height: 1.5;
                }

                .bullet-dash {
                    color: var(--amber, #e3a857);
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 14px;
                    flex-shrink: 0;
                }

                .bullet-text {
                    flex: 1;
                }
            `}</style>
        </div>
    );
}
