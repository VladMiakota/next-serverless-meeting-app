const AWS = require("aws-sdk");
const {v4: uuidv4} = require("uuid");
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, AWS_ENDPOINT } = process.env;

const chime = new AWS.Chime({
  region: REGION,
  accessKeyId:
  ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

chime.endpoint = new AWS.Endpoint(AWS_ENDPOINT);

const getChimeMeeting = async (meetingId = '') => {
  if(!meetingId) {
    const meetingId = uuidv4();
    return await chime
        .createMeeting({
          ClientRequestToken: meetingId,
          MediaRegion: 'us-east-1',
          ExternalMeetingId: meetingId,
        })
        .promise();
  } else {
    return await chime
        .getMeeting({
          MeetingId: query.meetingId,
        })
        .promise();
  }
}

const createChimeAttendee = async (meetingId, clientId) => {
  return  chime
      .createAttendee({
        MeetingId: meetingId,
        ExternalUserId: `${uuidv4().substring(0, 8)}#${clientId}`,
      })
      .promise();
}

const deleteChimeMeeting = async (meetingId) => {
  return await chime.deleteMeeting({
    MeetingId: meetingId
  }).promise();
}


module.exports = {
  getChimeMeeting,
  createChimeAttendee,
  deleteChimeMeeting
}
