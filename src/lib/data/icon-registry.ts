// Centralized icon registry — imports only the Lucide icons actually used in the app.
// This avoids the barrel export (`import * as Icons from '@lucide/svelte'`) which
// prevents tree-shaking and bundles the entire ~135KB icon library.

import {
	Activity,
	AlertTriangle,
	BookOpen,
	Brain,
	Check,
	Code,
	Cpu,
	Database,
	ExternalLink,
	FileCode2,
	GitBranch,
	Globe,
	HelpCircle,
	Layers,
	Layout,
	Link,
	Menu,
	MessageCircle,
	Palette,
	Search,
	Shield,
	ShieldCheck,
	Smartphone,
	Terminal,
	Triangle,
	X,
	Zap
} from '@lucide/svelte';

import type { Component } from 'svelte';

const ICON_MAP: Record<string, Component<any>> = {
	Activity,
	AlertTriangle,
	BookOpen,
	Brain,
	Check,
	Code,
	Cpu,
	Database,
	ExternalLink,
	FileCode2,
	GitBranch,
	Globe,
	HelpCircle,
	Layers,
	Layout,
	Link,
	Menu,
	MessageCircle,
	Palette,
	Search,
	Shield,
	ShieldCheck,
	Smartphone,
	Terminal,
	Triangle,
	X,
	Zap
};

export function getIcon(name: string): Component<any> {
	return ICON_MAP[name] || HelpCircle;
}

export function getIconOr(name: string, fallback: Component<any>): Component<any> {
	return ICON_MAP[name] || fallback;
}
