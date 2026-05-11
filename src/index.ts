/**
 * @creadev.org/runtime
 *
 * Consumer runtime - uses framework + sandbox.
 *
 * EXAMPLES:
 * ```typescript
 * import { init, think, act, state } from '@creadev.org/runtime';
 *
 * await init();
 * const result = await think('what time is it?');
 * await act({ type: 'log', message: 'Hello' });
 * ```
 * ============================================================================
 */

import { Framework } from '@creadev.org/framework';
import { Sandbox } from '@creadev.org/sandbox';

// ============================================================================
// STATE
// ============================================================================

interface RuntimeState {
  initialized: boolean;
  startTime: number;
  opsCount: number;
  framework: Framework;
  sandbox: Sandbox;
}

// Singleton state
let _state: RuntimeState | null = null;

// ============================================================================
// INIT
// ============================================================================

/** Initialize runtime */
export async function init(options?: {
  rateLimit?: number;
  maxConcurrent?: number;
  agentId?: string;
}): Promise<{ ok: boolean }> {
  if (_state?.initialized) {
    return { ok: true };
  }

  _state = {
    initialized: false,
    startTime: Date.now(),
    opsCount: 0,
    framework: new Framework(),
    sandbox: new Sandbox({
      maxConcurrent: options?.maxConcurrent ?? 3,
      agentId: options?.agentId ?? 'default',
    }),
  };

  _state.initialized = true;
  return { ok: true };
}

// ============================================================================
// THINK
// ============================================================================

/** Think - query/reason/decide */
export async function think(query: string): Promise<string> {
  if (!_state?.initialized) {
    throw new Error('Runtime not initialized. Call init() first.');
  }

  _state.opsCount++;
  
  // Use sandbox for read
  return _state.sandbox.read(async () => {
    // Simple mock - in real impl, would use brain/search
    return `Thought about: ${query}`;
  });
}

// ============================================================================
// ACT
// ============================================================================

/** Act - execute operations */
export async function act(operation: {
  type: string;
  [key: string]: unknown;
}): Promise<{ success: boolean }> {
  if (!_state?.initialized) {
    throw new Error('Runtime not initialized. Call init() first.');
  }

  _state.opsCount++;
  
  // Use sandbox for write
  return _state.sandbox.write(async () => {
    return { success: true };
  });
}

// ============================================================================
// STATE
// ============================================================================

/** Get runtime state */
export function state(): RuntimeState['opsCount'] | null {
  return _state?.opsCount ?? null;
}

/** Check if initialized */
export function isInitialized(): boolean {
  return _state?.initialized ?? false;
}

// ============================================================================
// STATUS
// ============================================================================

/** Get status */
export function getStatus() {
  if (!_state) {
    return { initialized: false };
  }

  return {
    initialized: _state.initialized,
    uptime: Date.now() - _state.startTime,
    opsCount: _state.opsCount,
    sandbox: _state.sandbox.getStatus(),
  };
}