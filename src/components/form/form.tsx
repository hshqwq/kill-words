import mergeCn from "@/scripts/utils/mergeCn";
import { AConfig, IConfig } from "@/stores/config";
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import { useRecoilState } from "recoil";
import { ChangeEventHandler, useState } from "react";

export interface IFormProps {
    className?: string;
}

export default function Form({ className }: IFormProps) {
    const [config, setConfig] = useRecoilState(AConfig);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const set = function <K extends keyof IConfig>(key: K, value: IConfig[K]) {
        setConfig(prev => { return { ...prev, [key]: value }; });
    };

    const onUploadBgHandler: ChangeEventHandler<HTMLInputElement> = (ev) => {
        const file = ev.currentTarget.files?.[0];

        if (!file) return;
        if (!/^image\/.+/i.test(file.type))
            return setErrorMsg('错误的文件类型');

        const bgUrl = URL.createObjectURL(file);
        set('bg', bgUrl);
        setErrorMsg('');
    };

    return <Container sx={{ '&>*': { m: 1 } }} maxWidth="md" className={mergeCn(className)}>
        <TextField label="标题" fullWidth variant="standard" value={config.title}
            onChange={ev => set('title', ev.target.value)} />
        <TextField label="今日单词" variant="standard" value={config.target}
            onChange={ev => set('target', Number(ev.target.value) || 0)} />
        <TextField label="完成天数" variant="standard" value={config.days}
            onChange={ev => set('days', Number(ev.target.value) || 0)} />
        <Box>
            <Typography variant="button">背景</Typography>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Button fullWidth startIcon={<UploadIcon />}>
                上传
                <input accept="image/*" className="absolute opacity-0 w-full z-10" type="file" onChange={onUploadBgHandler} />
            </Button>
        </Box>
    </Container>;
}