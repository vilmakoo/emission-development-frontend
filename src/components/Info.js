import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class Info extends Component {
  render() {

    return (
      <div>
        <Card className={'info'}>
          <CardContent>
            <Typography variant='h2' component='h3' color='primary' gutterBottom={true}>
              Welcome!
            </Typography>

            <Typography paragraph color='textPrimary' className='info-text'>
              With this app you can search for a country and see how its CO²-emissions have developed during the years. This is done by typing the country's name to the search field on the right. To see how much the country has emitted per capita, check the "Include populations" check box. You can also compare these pieces of information to the average emissions of countries with high income. The results will be visualized in three charts: the first will show the emissions, the second the populations and the last one contains the emissions per capita. You can zoom in to see only certain years by clicking on the chart and selecting an area.
            </Typography>

            <Typography paragraph color='textPrimary' className='info-text'>
              You can also see a list of countries with largest emissions per capita.
            </Typography>

            <Typography paragraph color='textPrimary' className='info-text'>
              The database can be updated by clicking the "Update database" button. The system will then get the newest information from World Bank's API and update the database. This takes some time, so be patient.
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Info;