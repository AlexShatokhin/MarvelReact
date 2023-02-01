import { Link } from "react-router-dom";
import Error from "../Error/Error";


const Page404 = () => {
    return (
        <>
            <Error />
            <Link to = "/" className="single-comic__back">Back to main page</Link>
        </>

    )
}

export default Page404;