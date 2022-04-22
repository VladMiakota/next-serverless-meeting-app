require('dotenv').config();
const {parseJsonSafe, json} = require('./helpers/helpers')
const {getChimeMeeting, createChimeAttendee, deleteChimeMeeting} = require('./services/chime.service')

exports.joinToMeeting = async (event, context, callback) => {
  try {
    const query = event.queryStringParameters;
    const meeting = await getChimeMeeting(query.meetingId)
    const attendee = await createChimeAttendee(meeting.Meeting.MeetingId)

    return json({
      meeting,
      attendee,
    });
  } catch (e) {
    console.log(e)
  }
};

exports.endMeeting = async (event, context) => {
  const body = parseJsonSafe(event.body);
  await deleteChimeMeeting(body.meetingId)
  return json();
};
