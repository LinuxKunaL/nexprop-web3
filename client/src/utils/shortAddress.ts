export default function shortAddress(addr: string) {
  if (addr.startsWith("0x")) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }
  return addr;
}
