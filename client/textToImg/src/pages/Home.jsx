import { Header } from "../components/header"
import { Steps } from "../components/steps"
import { Content } from "../components/Content"
import { Testimonial } from "../components/testimonial"
import { Generate } from "../components/generate"
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