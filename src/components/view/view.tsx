import styles from './view.module.css';

/* eslint-disable @next/next/no-img-element */
import mergeCn from "@/scripts/utils/mergeCn";
import { AConfig } from "@/stores/config";
import { Box, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import dayjs from "dayjs";
import { useState, PointerEvent, useEffect } from 'react';
import { ADrawer } from '@/stores/drawer';
import pubUse from '@/scripts/utils/pub-use';

export interface IViewProps {
    className?: string;
}

export function Title() {
    const { icon, title } = useRecoilValue(AConfig);

    return <div className="flex m-7 items-center h-8 text-white">
        <Image className="object-cover w-fit h-full mr-4" src={pubUse(icon)} alt="icon" width={128} height={128} />
        <Typography variant="subtitle1">{title}</Typography>
    </div>;
}

export function Date() {


    return <Box className='text-sm font-thin mb-2' alignItems="center">
        <EventAvailableOutlinedIcon className="mr-3 scale-75" />
        <span className="whitespace-break-spaces">{dayjs().format('dddd,   MMMM  D')}</span>
    </Box>;
}

export function Num({ children = 0, label, className }: { children?: number; label?: string; className?: string; }) {

    return <Box className={className}>
        <Typography className={mergeCn('scale-x-90 origin-left', styles.num)} variant="h4">{children ?? 0}</Typography>
        {label && <Typography variant="overline">{label}</Typography>}
    </Box>;
}

export function Finish() {
    const [{ target, days }, setConfig] = useRecoilState(AConfig);

    useEffect(() => {
        window.onload = () =>
            setConfig(prev => {
                const newValue = { 
                    ...prev, 
                    target: Number(localStorage.getItem('target')) || prev.target,
                    days: dayjs().diff(dayjs(localStorage.getItem('days')), 'day') || 0 
                };
                
                return newValue;
            });
    });

    return <Box className='h-16 flex'>
        <Num label="今日目标">{target ?? 0}</Num>
        <Num className="ml-10" label="今日目标">{days ?? 0}</Num>
    </Box>;
}

export function Share() {


    return <Box className='relative h-full flex flex-col items-end justify-between'>
        <Image className={mergeCn("w-fit", styles['qr-code'])} src={pubUse("/QR-code.png")} alt="QR-code" width={128} height={128} />
        <Typography className="h-6" variant="overline">和两亿人一起百词斩</Typography>
    </Box>;
}

export default function View({ className }: IViewProps) {
    const { bg } = useRecoilValue(AConfig);
    const [, setDrawer] = useRecoilState(ADrawer);
    const [dragging, setDragging] = useState<boolean>(false);
    const [startY, setStartY] = useState<number>(0);

    const onPointerDownHandler = (ev: PointerEvent<HTMLDivElement>) => {
        setStartY(ev.screenY);
        setDragging(true);
    };

    const onPointerMoveHandler = (ev: PointerEvent<HTMLDivElement>) => {
        if (!dragging) return;
        const offset = ev.screenY - startY;

        const scrollOffset = 6;
        if (offset <= -scrollOffset) {
            setDrawer(true);
            setDragging(false);
        }
        else if (offset >= scrollOffset) {
            setDrawer(false);
            setDragging(false);
        }
    };

    const onPointerUpHandler = (ev: PointerEvent<HTMLDivElement>) => {
        setDragging(false);
    };

    return <div className={mergeCn("relative z-0 select-none text-white bg-slate-100 overflow-hidden", styles.view, className)}
        onPointerDown={onPointerDownHandler}
        onPointerMove={onPointerMoveHandler}
        onPointerUp={onPointerUpHandler}>
        <img className="absolute -z-10 select-none brightness-75 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
            src={bg} width='280' height='280' alt="bg" />
        <Title />
        <Box className="absolute pl-7 pr-7 flex bottom-7 w-full h-24 items-end justify-between">
            <Box>
                <Date />
                <Finish />
            </Box>
            <Share />
        </Box>
    </div>;
}