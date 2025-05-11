import { Header } from "../components/Header"
import { Steps } from "../components/Steps"
import { Content } from "../components/Content"
import { Testimonial } from "../components/Testimonial"
import { Generate } from "../components/Generate"
export function Home(){
    return(
        <div>
            <Header/>
            <Steps/>
            <Content/>
            <Testimonial/>
            <Generate/>
        </div>
    )
}
//change