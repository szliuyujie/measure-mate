'use strict'

var React = require('react')
var createReactClass = require('create-react-class')
var ReactBootstrap = require('react-bootstrap')
var Grid = ReactBootstrap.Grid
var Row = ReactBootstrap.Row
var Col = ReactBootstrap.Col
var Jumbotron = ReactBootstrap.Jumbotron

var About = createReactClass({
  displayName: 'About',

  render: function () {
    return (
      <Grid fluid>
        <Row>
          <Col md={3} />
          <Col md={6}>
            <Jumbotron>
              <p className='logo-slogan-text'>This site is based on the <a className='logo-text' href='https://github.com/mvillis/measure-mate'>Measure Mate</a> project.</p>
            </Jumbotron>
            <Jumbotron>
              <span className='logo' />
              <h1 className='logo-text wrap'>Measure Mate!</h1>
              <p className='logo-slogan-text'>A tool to track maturity assessments for your team.</p>
            </Jumbotron>
          </Col>
          <Col md={3} />
        </Row>
      </Grid>
    )
  }
})

module.exports = About
