radio.setGroup(69)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
let my_serial = control.deviceSerialNumber()
let string = "A, B, C, D: "
let name = "send"
let number = 0
let value = 0
let list_of_votes = [0, 0, 0, 0]
let list_of_microbits = [my_serial]
input.onPinPressed(TouchPin.P0, function client_working() {
    
    if (name == "send" && number == 0) {
        radio.sendValue("send", 1)
        basic.showNumber(1)
        number = 1
    } else {
        radio.sendValue("send", 0)
        basic.showNumber(0)
        number = 0
    }
    
})
function received_serial_number(name: any, value: any) {
    
    let remote_serial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (name == "learn" && value == 1) {
        if (list_of_microbits.indexOf(remote_serial) < 0) {
            list_of_microbits.push(remote_serial)
        }
        
    }
    
}

radio.onReceivedValue(function on_received_value(name: string, value: number) {
    function voting_A() {
        if (name == "vote" && value == 1) {
            
            list_of_votes[0] += 1
            basic.showString("A")
            console.log(string)
            console.log(list_of_votes)
        }
        
    }
    
    function voting_B() {
        if (name == "vote" && value == 2) {
            
            radio.sendValue("vote", 2)
            list_of_votes[1] += 1
            basic.showString("B")
            console.log(string)
            console.log(list_of_votes)
        }
        
    }
    
    function voting_C() {
        if (name == "vote" && value == 3) {
            
            radio.sendValue("vote", 3)
            list_of_votes[2] += 1
            basic.showString("C")
            console.log(string)
            console.log(list_of_votes)
        }
        
    }
    
    function voting_D() {
        if (name == "vote" && value == 4) {
            
            radio.sendValue("vote", 4)
            list_of_votes[3] += 1
            basic.showString("D")
            console.log(string)
            console.log(list_of_votes)
        }
        
    }
    
})
input.onButtonPressed(Button.AB, function zero_votes() {
    
    list_of_votes = [0, 0, 0, 0]
    console.log(list_of_votes)
})
