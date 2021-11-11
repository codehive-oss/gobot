import { NextPage } from "next";
import NavbarProvider from "../components/NavbarProvider";

interface VotePageProps {
  
}
 
const VotePage: NextPage<VotePageProps> = () => {
  return <NavbarProvider>
    <div>
      <h1>Vote Page</h1>
    </div>
  </NavbarProvider>
}
 
export default VotePage;