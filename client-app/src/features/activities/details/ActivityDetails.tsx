import React, { useContext, FC, useEffect } from 'react';
import { Card, Image, Button, GridColumn, Grid } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore'
import { observer } from 'mobx-react-lite';
import { Link, RouteComponentProps } from 'react-router-dom';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSideBar from './ActivityDetailedChat'

interface DetailParams {
    id: string
}


const ActivityDetails: FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore)
    const {activity, loadingInitial, loadActivity} = activityStore


    useEffect(() => {
        loadActivity(match.params.id)
    }, [loadActivity, match.params.id]);

    if (loadingInitial || !activity) return <LoadingComponent content={("still loading activity")}/>

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                < ActivityDetailedChat/>
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSideBar/>
            </GridColumn>
        </Grid>
    );
};

export default observer(ActivityDetails);
