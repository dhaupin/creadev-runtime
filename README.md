# @creadev.org/runtime

Consumer runtime - uses framework + sandbox.

```bash
npm install @creadev.org/runtime
```

```typescript
import { init, think, act } from '@creadev.org/runtime';

await init();
await think('what is meaning?');
await act({ type: 'log', message: 'hello' });
```