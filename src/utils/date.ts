export const secondToday = () => {
    const date = new Date();
    return date.getSeconds() + (60 * date.getMinutes()) + (60 * 60 * date.getHours());
}

export const timerToNext = (step: number) => {
    const next = step - secondToday() % step;

    const h = Math.floor(next / 3600)
    const m = Math.floor(next / 60 - h * 60);
    const s = next - (h * 3600 + m * 60);

    return { s, m, h }
}