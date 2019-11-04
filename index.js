/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require("alexa-sdk");
const http = require("https");



//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "amzn1.ask.skill.cc851c82-40c3-4976-b185-484f490b8c4b";

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const GetNewFactHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest'
        || (request.type === 'IntentRequest'
          && request.intent.name === 'GetNewFactIntent');
    },
    handle(handlerInput) {
      const factArr = data;
      const factIndex = Math.floor(Math.random() * factArr.length);
      const randomFact = factArr[factIndex];
      const speechOutput = GET_FACT_MESSAGE + randomFact;
  
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withSimpleCard(SKILL_NAME, randomFact)
        .getResponse();
    },
  };
  
  const HelpHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(HELP_MESSAGE)
        .reprompt(HELP_REPROMPT)
        .getResponse();
    },
  };
  
  const ExitHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && (request.intent.name === 'AMAZON.CancelIntent'
          || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(STOP_MESSAGE)
        .getResponse();
    },
  };
  
  const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
  
      return handlerInput.responseBuilder.getResponse();
    },
  };
  
  const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak('Sorry, an error occurred.')
        .reprompt('Sorry, an error occurred.')
        .getResponse();
    },
  };
  
  const SKILL_NAME = 'Space Facts';
  const GET_FACT_MESSAGE = 'Here\'s your fact: ';
  const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
  const HELP_REPROMPT = 'What can I help you with?';
  const STOP_MESSAGE = 'Goodbye!';
  
  const data = [
    'A year on Mercury is just 88 days long.',
    'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
    'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
    'On Mars, the Sun appears about half the size as it does on Earth.',
    'Earth is the only planet not named after a god.',
    'Jupiter has the shortest day of all the planets.',
    'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
    'The Sun contains 99.86% of the mass in the Solar System.',
    'The Sun is an almost perfect sphere.',
    'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
    'Saturn radiates two and a half times more energy into space than it receives from the sun.',
    'The temperature inside the Sun can reach 15 million degrees Celsius.',
    'The Moon is moving approximately 3.8 cm away from our planet every year.',
  ];
  
  const skillBuilder = Alexa.SkillBuilders.standard();
  
  exports.handler = skillBuilder
    .addRequestHandlers(
      GetNewFactHandler,
      HelpHandler,
      ExitHandler,
      SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();


const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'welcome to web update');
    },
    'ContentUpdate': function() {
    //Get user input
    var categoryType = this.event.request.intent.slots.category.value;

   

    // //Post response to firebase
    // Firebase.database().ref('/').set({
    //     preference: categoryType
    // }).then((data)=>{
    //     Firebase.app().delete().then()
    // }).catch((err) => {
    //     console.log(err);
    // })

    var options = {
    "method": "POST",
    "hostname": "bomma-app-1.herokuapp.com",
    "port": null,
    "path": "/update/news-content",
    "headers": {
        "content-type": "application/json"
    }
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
    });

    req.write(JSON.stringify({ content: 'no-content' }));
    req.end();

    this.emit(':ask', 'you updated to ' + categoryType);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'you can ask for any news category');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'bye bye, have a nice day');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'have a nice day');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', 'The session ended');
    },
    'Unhandled': function () {
        this.emit(':tell', 'Something went wrong. Please try again.');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
