import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Users,
  MessageCircle,
  Search,
  UserX,
} from "lucide-react";
import Header from "../components/common/Header";
import RouteForm from "../components/sidebar/RouteForm";
import StudentList from "../components/sidebar/StudentList";
import MapContainer from "../components/map/MapContainer";
import ChatWindow from "../components/chat/ChatWindow";
import { generateUsername } from "../utils/usernameGenerator";
import { calculateRouteMatch } from "../utils/routeCalculator";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRoute, setUserRoute] = useState(null);
  const [nearbyStudents, setNearbyStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("commuteUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
      const newUser = {
        id: Date.now(),
        username: generateUsername(),
        avatar: generateAvatar(),
      };
      setCurrentUser(newUser);
      localStorage.setItem("commuteUser", JSON.stringify(newUser));
    }
  }, []);

  // Mock data for nearby students
  const mockStudents = [
    {
      id: 1,
      username: "Student_Phoenix_2156",
      avatar: "P",
      route: "Downtown → University Campus",
      startLocation: "Downtown Area",
      endLocation: "University Campus",
      departureTime: "08:00",
      matchPercentage: 94,
      color: "bg-gradient-to-r from-red-400 to-yellow-400",
    },
    {
      id: 2,
      username: "Scholar_Nova_8831",
      avatar: "N",
      route: "Maple Street → Tech Campus",
      startLocation: "Maple Street",
      endLocation: "Tech Campus",
      departureTime: "08:15",
      matchPercentage: 87,
      color: "bg-gradient-to-r from-green-400 to-blue-400",
    },
    {
      id: 3,
      username: "Rider_Cosmic_4423",
      avatar: "C",
      route: "Oak Avenue → University Campus",
      startLocation: "Oak Avenue",
      endLocation: "University Campus",
      departureTime: "07:45",
      matchPercentage: 76,
      color: "bg-gradient-to-r from-purple-400 to-pink-400",
    },
  ];

  const generateAvatar = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const handleRouteSubmit = (routeData) => {
    setLoading(true);
    setUserRoute(routeData);

    // Simulate API call delay
    setTimeout(() => {
      // Calculate matches with mock data
      const studentsWithMatches = mockStudents.map((student) => ({
        ...student,
        matchPercentage: calculateRouteMatch(routeData, {
          startLocation: student.startLocation,
          endLocation: student.endLocation,
          departureTime: student.departureTime,
        }),
      }));

      setNearbyStudents(studentsWithMatches);
      setLoading(false);
    }, 2000);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedStudent(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header currentUser={currentUser} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto">
            {/* Route Planning Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Plan Your Route
                </h2>
              </div>

              <RouteForm onSubmit={handleRouteSubmit} loading={loading} />
            </div>

            {/* Nearby Students */}
            {nearbyStudents.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5" />
                    <h3 className="font-semibold">
                      Nearby Students ({nearbyStudents.length})
                    </h3>
                  </div>
                </div>

                <StudentList
                  students={nearbyStudents}
                  onStudentClick={handleStudentClick}
                />
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  <div>
                    <p className="text-gray-600 font-medium">
                      Finding ride matches...
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Searching for students on similar routes
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && nearbyStudents.length === 0 && userRoute && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <UserX className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">
                      No matches found
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Try adjusting your departure time or route
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg h-full border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      Interactive Route Map
                    </h3>
                  </div>

                  {userRoute && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Departure: {userRoute.departureTime}</span>
                    </div>
                  )}
                </div>
              </div>

              <MapContainer
                userRoute={userRoute}
                nearbyStudents={nearbyStudents}
                onStudentClick={handleStudentClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && selectedStudent && (
        <ChatWindow
          student={selectedStudent}
          currentUser={currentUser}
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
};

export default Home;
