# toast

Toast + centered alert for React Native. NativeWind for styles, RN `Animated` for motion. No native module, no rebuild.

Design ported from [`ting`](https://github.com/baronha/ting) — colors, sizes, durations and animation curves come from its native Android/iOS resources.

## Setup

```js
// tailwind.config.js
content: ['./app/**/*.{ts,tsx}', './toast/**/*.{ts,tsx}'],
```

```tsx
import { ToastProvider } from './toast';

export default function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

## Toast

```tsx
import { useToast } from './toast';

const toast = useToast();

toast.success('Saved');
toast.error('Payment failed', 'Card declined');
toast.warning('Low storage', 'Less than 1 GB left');
toast.processing('Uploading…');
```

Third argument is options:

```tsx
toast.success('Saved', 'All changes synced', {
  duration: 5000,
  position: 'bottom',
  onPress: () => router.push('/inbox'),
});
```

## Alert

Centered card instead of an edge toast.

```tsx
toast.alert({ type: 'success', title: 'Order placed', message: 'Arriving Tuesday' });

toast.alert({
  type: 'processing',
  title: 'Uploading…',
  duration: 0,
  backdropOpacity: 0.4,
  dismissible: false,
});

toast.dismissAlert();
```

## Promise

Shows `processing`, then swaps the same toast to success or error.

```tsx
await toast.promise(api.save(form), {
  loading: 'Saving…',
  success: 'Saved',
  error: 'Save failed',
});

await toast.promise(api.save(form), {
  loading: 'Saving…',
  success: (user) => ({ title: 'Saved', message: user.name }),
  error: (e) => ({ title: 'Failed', message: String(e) }),
});
```

Add `presentation: 'alert'` to render the states as the centered card.

## Manual control

```tsx
const id = toast.show({ type: 'warning', title: 'Reconnecting…', duration: 0 });
toast.update(id, { type: 'success', title: 'Back online' });
toast.hide(id);
toast.hideAll();
```

## Options

| | toast | alert | default |
|---|---|---|---|
| `title` | ✓ | ✓ | required |
| `message` | ✓ | ✓ | — |
| `type` | ✓ | ✓ | `'success'` |
| `duration` | ✓ | ✓ | see below, `0` = stays |
| `position` | ✓ | — | `'top'` |
| `dismissible` | swipe | tap | `true` |
| `haptic` | ✓ | ✓ | `true` |
| `icon` | ✓ | ✓ | preset icon |
| `accentColor` | ✓ | ✓ | preset color |
| `backdropOpacity` | — | ✓ | `0` |
| `onPress` / `onHide` | ✓ | ✓ | — |

Provider props: `maxToasts` (3), `defaultPosition` (`'top'`), `topOffset` / `bottomOffset` (48).

## Defaults per type

| type | color | toast duration |
|---|---|---|
| `success` | `#1CA658` | 3000 |
| `error` | `#F74850` | 4000 |
| `warning` | `#F59E0B` | 3500 |
| `processing` | `#8E8E93` | `0` (stays) |

Alerts default to 3000 for every type. Edit `styles.ts` to change any of it.

## Notes

- **Tailwind content glob is required.** NativeWind resolves unknown classes to nothing, so a missing glob gives you an unstyled toast — no error.
- **Provider must wrap the whole app**, above your navigator. Inside a screen, other screens paint over it.
- **Won't render over an RN `<Modal>`** — that's a separate native window. Put a second `<ToastProvider>` inside the modal if you need it there.
- **Haptics are optional** — used only if `expo-haptics` is installed, otherwise skipped.
- Positioning lives in `styles.ts` as plain styles (`VIEWPORT`, `STACK`), not Tailwind, so a broken Tailwind setup can't make toasts invisible.

## Files

| file | what |
|---|---|
| `types.ts` | `Toast`, `Alert`, options, context type |
| `styles.ts` | colors, durations, animation config, Tailwind classes |
| `ToastIcon.tsx` | 4 preset icons, drawn with Views |
| `ToastItem.tsx` | toast: slide animation, swipe to dismiss |
| `AlertItem.tsx` | alert: scale + fade, backdrop, tap to dismiss |
| `ToastProvider.tsx` | state, queue, `promise()` |
| `useToast.ts` | the hook |
