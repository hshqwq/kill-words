import random from "@/scripts/utils/radom";
import dayjs, { Dayjs } from "dayjs";
import { atom } from "recoil";

export interface IConfig {
    bg: string;
    icon: string;
    title: string;
    target: number;
    days: number;
    date: Dayjs;
}

const defaultValue: IConfig = {
    bg: 'https://www.todaybing.com/api/today/cn',
    icon: '/icon.png',
    title: '我在百词斩背单词',
    target: Math.round(random(50, 90)),
    days: 0,
    date: dayjs()
};

export const AConfig = atom<IConfig>({
    key: 'config',
    default: defaultValue,
    effects: [
        ({ onSet }) => {
            onSet((newValue, oldValue) => {
                if (newValue.days !== (oldValue as IConfig).days)
                    localStorage.setItem('days', dayjs().subtract(newValue.days || 0, 'day').toISOString());
                if (newValue.target !== (oldValue as IConfig).target)
                    localStorage.setItem('target', newValue.target.toString());
            });
        }
    ]
});