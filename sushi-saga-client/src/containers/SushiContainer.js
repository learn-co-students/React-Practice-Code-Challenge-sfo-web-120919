import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {
          props.shownConveyorSushis.map(s => <Sushi key={Math.random()} handleAddSushiToTableClick={props.handleAddSushiToTableClick}  sushi={s} />)
        }
        <MoreButton handleGetMoreSushiClick={props.handleGetMoreSushiClick} />
      </div>
    </Fragment>
  )
}

export default SushiContainer