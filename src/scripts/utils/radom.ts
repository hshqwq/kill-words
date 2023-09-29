export default function random(start: number=0, end: number=1): number {
    return Math.random() * (end - start) + start;
}