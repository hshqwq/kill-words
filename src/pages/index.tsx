import Drawer from "@/components/drawer/drawer";
import dynamic from "next/dynamic";
const View = dynamic(() => import('@/components/view/view'), {ssr: false})

export default function Home() {

  return <main className="h-screen">
    <View className="w-full h-full"/>
    <Drawer></Drawer>
  </main>;
}
