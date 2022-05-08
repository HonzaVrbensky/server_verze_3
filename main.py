radio.set_group(69)
radio.set_transmit_power(7)
radio.set_transmit_serial_number(True)
my_serial = control.device_serial_number()

string = "A, B, C, D: "
name= "send"
name = "learn"
number= 1
value= 0
list_of_votes= [0,0,0,0]
list_of_microbits = [my_serial]

def client_working():
    if name == "send" and number == 0:
        radio.send_value("send", 1)
        basic.show_number(1)
    else:
        radio.send_value("send", 0)
        basic.show_number(0)
input.on_pin_pressed(TouchPin.P0, client_working)

def received_serial_number(name, value):
    global number, list_of_microbits
    remote_serial = radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)
    if name == "learn" and value == 1:
        if remote_serial not in list_of_microbits:
            list_of_microbits.append(remote_serial)

def on_received_value(name, value):
    def voting_A():
        if name == "vote" and value == 1:
            global list_of_votes
            list_of_votes[0] +=1
            basic.show_string("A")
            print(string)
            print(list_of_votes)

    def voting_B():
        if name == "vote" and value == 2:
            global list_of_votes
            radio.send_value("vote", 2)
            list_of_votes[1] +=1
            basic.show_string("B")
            print(string)
            print(list_of_votes)

    def voting_C():
        if name == "vote" and value == 3:
            global list_of_votes
            radio.send_value("vote", 3)
            list_of_votes[2] +=1
            basic.show_string("C")
            print(string)
            print(list_of_votes)

    def voting_D():
        if name == "vote" and value == 4:
            global list_of_votes
            radio.send_value("vote", 4)
            list_of_votes[3] +=1
            basic.show_string("D")
            print(string)
            print(list_of_votes)

radio.on_received_value(on_received_value)

def zero_votes():
    global list_of_votes
    list_of_votes = [0, 0, 0, 0]
    print(list_of_votes)
input.on_button_pressed(Button.AB, zero_votes)


#nevím, jak poslat pouze poslední hlas