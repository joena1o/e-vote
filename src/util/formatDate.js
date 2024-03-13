export function formatDate(inputDate) {
                 const date = new Date(inputDate);

                 // Get day, month, and year
                 const day = date.getDate();
                 const monthIndex = date.getMonth();
                 const year = date.getFullYear();

                 // Define an array of month names
                 const monthNames = [
                                  'January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 'December'
                 ];

                 // Format the date
                 const formattedDate = `${day}th ${monthNames[monthIndex]}, ${year}`;

                 return formattedDate;
}


export function getTimeDifference(date1, date2) {
                 // Convert the date strings to Date objects
                 const startDateTime = new Date(date1);
                 const endDateTime = new Date(date2);
             
                 // Calculate the time difference in milliseconds
                 const timeDifference = Math.abs(endDateTime - startDateTime);
             
                 // Calculate days, hours, minutes, and seconds
                 const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
                 const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                 const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
                 const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
             
                 return {
                     days,
                     hours,
                     minutes,
                     seconds
                 };
}



export function getDaysLeft(timestamp) {
    // Convert the timestamp to milliseconds
    const timestampMilliseconds = Date.parse(timestamp);
  
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();
  
    // Calculate the time difference in milliseconds
    const timeDifference = timestampMilliseconds - currentTime;
  
    // Check if the timestamp has passed
    if (timeDifference <= 0) {
        return 'Ongoing';
    }
  
    // Calculate the number of days left
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return `${daysLeft} days left`;
  }

  
export function hasTimestampPassed(timestamp) {
    // Convert the timestamp to milliseconds (assuming it's in seconds)
    const timestampMilliseconds = timestamp * 1000;
  
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();
  
    // Compare the timestamp with the current time
    return timestampMilliseconds <= currentTime;
  }
  
             