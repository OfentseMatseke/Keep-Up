import React from "react";
import {Bar} from 'react-chartjs-2';
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const MoneyChart = ({months, moneyReceived, moneySpent, moneySpentColor, moneyReceivedColor,loading}) => {
    const data = {
        labels: months,
        datasets: [
            {
                label: '# Money (R) Spent',
                data: [...moneySpent],
                backgroundColor: moneySpentColor,
            },
            {
                label: '# Money (R) Received',
                data: [...moneyReceived],
                backgroundColor: moneyReceivedColor,
            },
        ],
    };

    if(loading) return displaySkeleton();

    return (
        <Card>
            <CardContent>
                <div className='header'>
                    <Typography style={{margin:"10px"}} variant='h6'>Money received and Money spent</Typography>
                </div>
                <Bar type='bar' data={data} options={options}/>
            </CardContent>
        </Card>
    );
}
const displaySkeleton = () => {
    return (
        <Card>
            <CardContent>
                <div className='header'>
                    <Typography variant='h6'><Skeleton variant='text' /></Typography>
                </div>
                <Grid container justifyContent='center' >
                    <Grid item sm={12} xs={12} md={12} style={{paddingTop:'10px',paddingBottom:'10px'}} >
                        <Skeleton height={270} width='100%' variant='rect'/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

export default MoneyChart;