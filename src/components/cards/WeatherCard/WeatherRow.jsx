
import React from 'react'
import Grid from 'material-ui/Grid'

import WeatherTile from './WeatherTile'
const WeatherRow = ({ dataRow}) => {
  return (
    <Grid container spacing={0}>
      {dataRow.map((data, ind) => {
        return (
          <Grid item key={`weather-day-${ind}`} xs={6}>
            <WeatherTile {...data} index={ind} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default (WeatherRow);
