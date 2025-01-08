import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Login } from "./acesso/Login/page";
import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  return (
    <>
      
        <Login />
      
      
    </>
  );
}
