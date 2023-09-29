import { Box, Drawer as MuiDrawer } from "@mui/material";
import Form from "../form/form";
import { useRecoilState } from "recoil";
import { ADrawer } from "@/stores/drawer";

export default function Drawer() {
    const [open, setOpen] = useRecoilState(ADrawer);

    const onCloseHandler = () => setOpen(false);
    
    return <MuiDrawer
        anchor="bottom"
        open={open === true}
        onClose={onCloseHandler}>
            <Box className="bg-white pt-4 pb-4 pl-1 pr-1">
                {/* <div className="relative w-1/4 h-1.5 rounded mt-1.5 mb-1.5 left-1/2 -translate-x-1/2 bg-slate-400"/> */}
                <Form className="h-2/5"/>
            </Box>
    </MuiDrawer>;
}