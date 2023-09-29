export default function mergeCn(...cns: unknown[]): string {
    return cns.filter((cn) => typeof cn === "string").join(' ');
}