/* Your Code Here */
// Your code here


function createEmployeeRecord(recordArr) {
    const [firstName, familyName, title, payRate] = recordArr
    return {
       firstName: firstName,
       familyName: familyName,
       title: title,
       payPerHour: payRate,
       timeInEvents: [],
       timeOutEvents: []
    }
 }
 
 function createEmployeeRecords(nestedEmpArrays) {
    return nestedEmpArrays.map(createEmployeeRecord)
    //Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
    // return [{}, {}, {}]
 }
 
 function createTimeInEvent(dateTimeStr) {
    //Example dateTimeStr = "YYYY-MM-DD HHMM"
    const dtSplit = dateTimeStr.split(" ")
    const dtHourInt = parseInt(dtSplit[1])
    const dtDateStr = dtSplit[0]
    const newTimeInObj = {
       type: "TimeIn",
       hour: dtHourInt,
       date: dtDateStr
    }
    this.timeInEvents.push(newTimeInObj)
    return this
    //create up the new timeInObj then push it to the employee object's timeInEvents destructively, then return the empObj
    // return {
       //employee object with updated timeIn event in array
       //...
       //timeInEvents: [{
          // type: "TimeIn",
          // hour: HHMM,
          // date: YYYY-MM-DD
       // }]
    //}
 }
 
 function createTimeOutEvent(dateTimeStr) {
    const dtSplit = dateTimeStr.split(" ")
    const dtHourInt = parseInt(dtSplit[1])
    const dtDateStr = dtSplit[0]
    const newTimeOutObj = {
       type: "TimeOut",
       hour: dtHourInt,
       date: dtDateStr
    }
    this.timeOutEvents.push(newTimeOutObj)
    return this
    
    
    //Example dateTimeStr = "YYYY-MM-DD HHMM"
    //create up the new timeOutObj then push it to the employee object's timeOutEvents destructively, then return the empObj
    // return {
       //employee object with updated timeOut event in array
       //...
       //timeOutEvents: [{
          // type: "TimeOut",
          // hour: HHMM,
          // date: YYYY-MM-DD
       // }]
    //}
 }
 
 function hoursWorkedOnDate(dateStr) {
    const tInEvent = this.timeInEvents.find(tiEvent => tiEvent.date === dateStr)
    const tOutEvent = this.timeOutEvents.find(toEvent => toEvent.date === dateStr)
    
    const hoursWorked = (tOutEvent.hour - tInEvent.hour) / 100
    return hoursWorked
    //Example dateStr = "YYYY-MM-DD"
    // Find the number of hours elapsed between the dates timeInEvent and timeOutEvent and return that
    // returns hours worked as an Int
 }
 
 function wagesEarnedOnDate(dateStr) {
    const hoursWorked = hoursWorkedOnDate.call(this, dateStr)
    const payRate = this.payPerHour
 
    const payForDate = hoursWorked * payRate
    return payForDate
    //Example dateStr = "YYYY-MM-DD"
    // use hoursWorkedOnDate and multiply the hours by the record's payRate to determine amount owed - should be returned as a number
    // returns pay owed 
 }
 
//  function allWagesFor(empObj) {
//     const datesInArr = empObj.timeInEvents.map(tiEvent => tiEvent.date)
//     const datesOutArr = empObj.timeOutEvents.map(toEvent => toEvent.date)
 
//     if (datesInArr.length === datesOutArr.length) {
//        //no bad data proceed with wage reduce 
//        const wagesArr = datesInArr.map(date => wagesEarnedOnDate(empObj, date))
//        const totalWages = wagesArr.reduce((dayWage, value) => value + dayWage, 0)
//        return totalWages
//     } else {
//        console.log("There is bad data for this employee - number of clockin / clockout events mismatch")
//        return "Bad Data, check console error"
//     }
    
//     //using wagesEarnedOnDate, accumulate the value of all dates worked by the employee (probably use reduce) and return it as a number
//     //HINT: you'll need to find the available dates somehow
//     //returns pay owed for all dates on the empObj
//  }
 
 function findEmployeebyFirstName(empObjsArr, firstName) {
    return empObjsArr.find(empObj => empObj.firstName === firstName)
    // firstName is the string to use to find the empObj
    //Test the firstName field for a match with the firstName argument
    // return a matching record or "undefined"
 }
 
 function calculatePayroll(empObjArr) {
    // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. -- may also be able to use allWagesFor
    const allEmpWages = empObjArr.map(empObj => allWagesFor.call(empObj))
    const allEmpWagesTotal = allEmpWages.reduce((empWage, value) => value + empWage, 0)
    return allEmpWagesTotal
    // returns sum of pay owed to all employees for all dates as a number
 }



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}