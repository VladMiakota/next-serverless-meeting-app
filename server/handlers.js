require('dotenv').config();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION } = process.env;

const chime = new AWS.Chime({
  region: REGION,
  accessKeyId:
  ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

const json = (statusCode, contentType, body) => ({
  statusCode,
  headers: {
    'content-type': contentType,
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(body),
});

exports.joinToMeeting = async (event, context, callback) => {
  try {
    const query = event.queryStringParameters;
    let meetingId;
    let meeting;
    if (!query.meetingId) {
      meetingId = uuidv4();
      meeting = await chime
          .createMeeting({
            ClientRequestToken: meetingId,
            MediaRegion: 'us-east-1',
            ExternalMeetingId: meetingId,
          })
          .promise();
    } else {
      meetingId = query.meetingId;
      meeting = await chime
          .getMeeting({
            MeetingId: meetingId,
          })
          .promise();
    }
    const attendee = await chime
        .createAttendee({
          MeetingId: meeting.Meeting.MeetingId,
          ExternalUserId: `${uuidv4().substring(0, 8)}#${query.clientId}`,
        })
        .promise();

    return json(200, 'application/json', {
      meeting,
      attendee,
    });
  } catch (e) {
    console.log(e)
  }
};

exports.endMeeting = async (event, context) => {
  const body = JSON.parse(event.body);
  await chime.deleteMeeting({
    MeetingId: body.meetingId,
  }).promise();
  return json(200, 'application/json', {});
};
