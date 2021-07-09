import React, {useState} from "react";
import {Container} from "@material-ui/core";

import SuburbSelector from "./SuburbSelector";
import Charts from "./Charts";
import Cards from "./Cards";

function Statistics() {
    const [suburb,setSuburb] = useState('sandown');
    return (
        <div>
            <Container>
                <SuburbSelector onSuburbChange={suburb=>setSuburb(suburb)}/>
                <Cards suburb={suburb}/>
                <Charts suburb={suburb}/>
            </Container>
        </div>
    );
}

export default Statistics;