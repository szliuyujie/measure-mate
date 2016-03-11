'use strict'

var React = require('react')
global.jQuery = require('jquery')
var ReactBootstrap = require('react-bootstrap')
var ListGroupItem = ReactBootstrap.ListGroupItem
var Button = ReactBootstrap.Button
var Glyphicon = ReactBootstrap.Glyphicon
var OverlayTrigger = ReactBootstrap.OverlayTrigger
var Popover = ReactBootstrap.Popover

var RatingList = React.createClass({
  propTypes: {
    key: React.PropTypes.number,
    eventKey: React.PropTypes.number,
    activeTab: React.PropTypes.number,
    measurement: React.PropTypes.object,
    assessId: React.PropTypes.string.isRequired,
    syncMeasurement: React.PropTypes.func.isRequired,
    attribute: React.PropTypes.object
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    if (nextProps.activeTab === this.props.eventKey) {
      return true
    }
    return false
  },
  saveMeasurement: function (value) {
    var existingMeasurement = this.props.measurement
    var postData = {
      id: (this.props.measurement) ? this.props.measurement.id : '',
      assessment: this.props.assessId,
      rating: (value['rating']) ? value['rating'] : this.props.measurement.rating,
      target_rating: (value['target']) ? value['target'] : ((existingMeasurement && this.props.measurement.target_rating) ? this.props.measurement.target_rating : '') // eslint-disable-line camelcase
    }
    this.props.syncMeasurement(postData)
  },
  render: function () {
    var ratingNodes = this.props.attribute.ratings.map(function (rating) {
      var ratingActive = (this.props.measurement && this.props.measurement.rating) ? (this.props.measurement.rating === rating.id) : false
      var targetActive = (this.props.measurement && this.props.measurement.target_rating) ? (this.props.measurement.target_rating === rating.id) : false
      var targetBsStyle = targetActive ? 'success' : 'default'
      var descClass = (rating.desc_class ? ' ' + rating.desc_class : '') + (rating.colour ? ' rating-colour' : '')
      var header = function () {
        if ((this.props.measurement && this.props.measurement.rating)) {
          return (
            <div>
              <h4 className='inline clickable' onClick={this.saveMeasurement.bind(this, {rating: rating.id})}>{rating.name}</h4>
              <Button ref='currentBtn'
                onClick={this.saveMeasurement.bind(this, {target: rating.id})}
                bsStyle={targetBsStyle} className='target-btn'
                active={targetActive}
                bsSize='xsmall'>
                Target
              </Button>
              <OverlayTrigger trigger='click' placement='left' rootClose overlay={<Popover id={rating.id}>You have decided your current rating. Set your future goal by selecting a target button.</Popover>}>
                <Glyphicon className='target-help clickable' glyph='question-sign' />
              </OverlayTrigger>
            </div>
          )
        } else {
          return (
            <div>
              <h4 className='inline clickable' onClick={this.saveMeasurement.bind(this, {rating: rating.id})}>{rating.name}</h4>
            </div>
          )
        }
      }.bind(this)()
      return (
        <ListGroupItem active={ratingActive} id={rating.id} key={rating.id} header={header} className={descClass} style={{'borderLeftColor': rating.colour}}>
          <div className='clickable' onClick={this.saveMeasurement.bind(this, {rating: rating.id})}>
            {rating.desc}
          </div>
        </ListGroupItem>
        )
    }.bind(this))
    return (
      <div>
        {ratingNodes}
      </div>
    )
  }
})

module.exports = RatingList