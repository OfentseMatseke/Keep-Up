import React, {useEffect, useState} from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

import {sumOf} from "../../../../utils/helpers";
import MiniCard from "./MiniCard";

import * as eventService from "../../../../services/eventService";
import * as projectService from "../../../../services/projectsService";
import * as donationService from "../../../../services/donationsService";
import * as contributorService from "../../../../services/contributorService";

const Cards = ({suburb})=>{

    const currentMonth = new Date().getMonth();
    const [statsCardsData, setStatsCardsData] = useState([]);
    const [isLoading,setLoading] = useState(false);

    useEffect(()=>{
        (async ()=>{
            setLoading(true);
            const data = [
                {
                    label:'Current Month Total Donation',
                    data: `R ${sumOf(await donationService.getAllByMonthAndSuburb(suburb,currentMonth),'amount').toFixed(2)}`,
                    icon:'fas fa-money-bill-alt',
                    color:"#d326d9",
                },
                {
                    label:'Current Month Total Spent',
                    data: `R ${sumOf(await projectService.getByMonthAndSuburb(suburb,currentMonth),'spend').toFixed(2)}`,
                    icon:'fas fa-money-bill-wave',
                    color:"#7b26d9",
                },
                {
                    label:'Current Month Completed Events',
                    data: (await eventService.getCompleted(suburb,currentMonth)).length,
                    icon:'far fa-calendar-check',
                    color:"#ff6a00"
                },
                {
                    label:'Current Month Completed Projects',
                    data: (await projectService.getCompleted(suburb,currentMonth)).length,
                    icon:'far fa-calendar-check',
                    color:"#d9d026",
                },
                {
                    label:'All up Coming Projects',
                    data: ( await projectService.getUpComing(suburb)).length,
                    icon:'fas fa-calendar-alt',
                    color:"#47d926",
                },
                {
                    label:'All up Coming Events',
                    data: (await eventService.getAllUpComing(suburb)).length,
                    icon:'fas fa-calendar-alt',
                    color:"#36cbc0",
                },
                {
                    label:'New Registered Contributors',
                    data: ` ${(await contributorService.getAllByMonthAndSuburb(suburb,currentMonth)).length}`,
                    icon:'fas fa-user-friends',
                    color:"#d92650",
                }
            ];
            setStatsCardsData(data);
            setLoading(false);
        })()
    },[suburb]);

    if(isLoading) return (displaySkeletons());

    return(
        <Grid container spacing={2}>
            {statsCardsData.map((statsData,index) =>(
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <MiniCard  label={statsData.label}
                               data={statsData.data}
                               icon={statsData.icon}
                                color={statsData.color}/>
                </Grid>
            ))}
        </Grid>
    )
}

const displaySkeletons=()=>{
    const skeletons = [1,2,3,4,5,6,7,8];
    return(
        <Grid container spacing={2}>
            {skeletons.map((skeletons,index) =>(
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} alignItems='center' justifyContent='center'>
                                <Grid item sm={3}>
                                    <Typography align='center'>
                                        <Skeleton variant="circle" width={40} height={40} />
                                    </Typography>
                                </Grid>
                                <Grid item sm={9}>
                                    <Typography variant='h5' align='center'  style={{fontWeight:'bold'}}><Skeleton/>
                                    </Typography>
                                    <Typography align='center'><Skeleton/></Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
export default  Cards;

