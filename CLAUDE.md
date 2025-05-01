# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

- `npm run dev` - Development build with watch mode
- `npm run build` - Production build with type checking
- `npm run clean` - Remove build artifacts

## Code Style Guidelines

- TypeScript with strict null checks and no implicit any
- Use Preact for JSX/TSX components (aliased as React)
- Follow 2-space indentation with spaces (not tabs)
- Use LF line endings
- ESLint rules:
  - Unused variables are errors (except function parameters)
  - TS-comments are allowed
  - Empty functions are allowed
- Import order: external libraries first, then local modules
- Use explicit typing for function parameters and return values
- Prefer async/await for asynchronous operations
- Use console.log for debug information

## Project Context

This plugin wraps FullCalendar.io for use in Obsidian.
