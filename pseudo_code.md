START

1. USER AUTHENTICATION
   FUNCTION login_or_register():
       input email, password
       if new_user:
           save user credentials in database
           generate unique_username = generate_random_username()
           store unique_username
       else:
           validate credentials
       return user_session

-----------------------------------------------------

2. ENTER ROUTE DETAILS
   FUNCTION enter_route(user_id):
       input source_location, destination_location
       route = get_route_from_API(source_location, destination_location)
       store route in database linked to user_id
       return route

-----------------------------------------------------

3. MATCHING ALGORITHM
   FUNCTION find_matches(user_id, route):
       matched_users = []
       FOR each student in database:
           IF student.user_id != user_id:
               overlap = compare_routes(route, student.route)
               time_diff = abs(user.departure_time - student.departure_time)
               IF overlap > THRESHOLD AND time_diff < MAX_ALLOWED:
                   matched_users.append(student.unique_username)
       return matched_users

-----------------------------------------------------

4. DISPLAY ON MAP
   FUNCTION show_map_with_matches(route, matched_users):
       plot current_user route on map
       FOR each user in matched_users:
           place icon on map at student.current_location
       enable click_on_icon(user)

-----------------------------------------------------

5. CLICK + CHAT
   FUNCTION click_on_icon(selected_user):
       show student_profile (unique_username, travel_time, seats)
       if user wants to chat:
           open_chat_window(current_user, selected_user)

   FUNCTION chat_window(user1, user2):
       WHILE chat_active:
           message = user_input()
           send_message(user1, user2, message)
           display_message(user2 → user1)

-----------------------------------------------------

6. SAFETY & ANONYMITY
   FUNCTION generate_random_username():
       prefix = random_word()
       suffix = random_number(100-999)
       username = prefix + "_" + suffix
       ensure username not in database
       return username

🔑 Key Functions Explained

login_or_register() → Handles authentication and creates anonymous usernames.

enter_route() → Saves the student’s travel path.

find_matches() → Core algorithm that compares routes & times.

show_map_with_matches() → Displays overlapping students on a map with clickable icons.

click_on_icon() & chat_window() → Allows anonymous chatting with potential ride partners.

generate_random_username() → Guarantees no duplicate usernames.