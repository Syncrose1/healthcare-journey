import React, { useState } from 'react';
import { AlertCircle, Users, FileText, Heart, ArrowRight, RefreshCcw, CheckCircle, Lightbulb, BookOpen, Building } from 'lucide-react';

const Adventure = () => {
  const [currentScene, setCurrentScene] = useState('start');
  const [pathTaken, setPathTaken] = useState([]);
  const [learnedPoints, setLearnedPoints] = useState(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [currentSummary, setCurrentSummary] = useState(null);

  const summaries = {
    safe_space_end: {
      title: "Creating Safe Spaces for Disclosure",
      keyLearnings: [
        "The Ockenden Report demonstrated how crucial safe spaces are for truth-telling",
        "Protected environments enable both families and staff to speak openly",
        "Confidential channels lead to more comprehensive understanding of issues"
      ],
      recommendations: [
        "Establish ongoing confidential feedback mechanisms",
        "Create support networks for families and staff",
        "Develop clear protocols for handling sensitive disclosures"
      ],
      ockendenLink: "The Ockenden investigation relied heavily on creating safe spaces for over 1,800 families to share their experiences, leading to crucial systemic insights."
    },
    reporting_end: {
      title: "Systematic Incident Reporting",
      keyLearnings: [
        "Anonymous reporting systems capture more accurate data",
        "Pattern recognition becomes possible with comprehensive reporting",
        "Staff feel more empowered to raise concerns"
      ],
      recommendations: [
        "Implement robust anonymous reporting systems",
        "Develop clear escalation pathways",
        "Establish regular pattern analysis reviews"
      ],
      ockendenLink: "Ockenden identified that inadequate incident reporting and investigation had masked serious systemic problems for years."
    },
    culture_end: {
      title: "Cultural Transformation",
      keyLearnings: [
        "Organizational culture directly impacts patient safety",
        "Leadership accountability is crucial for change",
        "Open communication prevents serious incidents"
      ],
      recommendations: [
        "Develop leadership training programs",
        "Create psychological safety frameworks",
        "Establish regular culture assessments"
      ],
      ockendenLink: "The Ockenden Report highlighted how a culture of fear and blame contributed to ongoing failures in care."
    }
  };

  const scenes = {
    start: {
      title: "Healthcare Confidential: An Interactive Journey",
      content: "You're a healthcare improvement specialist tasked with investigating a series of incidents at a major hospital. How will you approach this sensitive investigation?",
      choices: [
        { text: "Focus on gathering patient stories", next: "patient_stories" },
        { text: "Analyze system-wide patterns", next: "patterns" },
        { text: "Examine organizational culture", next: "culture" }
      ],
      icon: AlertCircle
    },
    patient_stories: {
      title: "The Power of Patient Voices",
      content: "You begin collecting patient testimonies. Like in the Ockenden Report, you find that many families have been waiting years to share their experiences. What aspect do you focus on?",
      choices: [
        { text: "Create a safe space for disclosure", next: "safe_space" },
        { text: "Document patterns of incidents", next: "patterns" },
        { text: "Investigate communication breakdowns", next: "communication_issues" }
      ],
      learning: "Patient stories are crucial for understanding the human impact of healthcare failures",
      icon: Users
    },
    communication_issues: {
      title: "Communication Barriers",
      content: "Your investigation reveals significant gaps in communication between healthcare providers and families. How do you address this?",
      choices: [
        { text: "Develop new communication protocols", next: "safe_space_end" },
        { text: "Create feedback mechanisms", next: "reporting_end" },
        { text: "Address cultural barriers", next: "culture_end" }
      ],
      icon: Users
    },
    safe_space: {
      title: "Creating a Safe Environment",
      content: "You establish confidential channels for families to share their experiences. The response is overwhelming. What's your next step?",
      choices: [
        { text: "Set up support groups for affected families", next: "support_groups" },
        { text: "Create anonymous feedback system", next: "feedback_system" },
        { text: "Establish advocacy partnerships", next: "advocacy" }
      ],
      icon: Heart
    },
    support_groups: {
      title: "Building Support Networks",
      content: "The support groups reveal common themes in families' experiences. How do you proceed with this information?",
      choices: [
        { text: "Document and analyze patterns", next: "safe_space_end" },
        { text: "Share anonymized insights with leadership", next: "reporting_end" },
        { text: "Create formal advocacy program", next: "culture_end" }
      ],
      icon: Users
    },
    patterns: {
      title: "System-Wide Analysis",
      content: "You begin analyzing incident data across departments. Like Ockenden, you notice recurring themes. What catches your attention first?",
      choices: [
        { text: "Staff workload and resource allocation", next: "staffing" },
        { text: "Incident reporting processes", next: "incident_reporting" },
        { text: "Leadership response patterns", next: "leadership" }
      ],
      icon: FileText
    },
    incident_reporting: {
      title: "Incident Reporting Analysis",
      content: "Your review of incident reporting systems reveals inconsistencies and gaps. What's your priority?",
      choices: [
        { text: "Implement standardized reporting", next: "reporting_end" },
        { text: "Create anonymous reporting channels", next: "safe_space_end" },
        { text: "Address reporting culture", next: "culture_end" }
      ],
      icon: FileText
    },
    staffing: {
      title: "Staffing and Resources",
      content: "Your analysis reveals concerning patterns in staffing levels and resource allocation. What's your priority?",
      choices: [
        { text: "Document safety implications", next: "safe_space_end" },
        { text: "Create staff feedback system", next: "reporting_end" },
        { text: "Address organizational barriers", next: "culture_end" }
      ],
      icon: Building
    },
    culture: {
      title: "Cultural Assessment",
      content: "You focus on understanding the hospital's culture. Staff begin opening up about various concerns. What do you investigate next?",
      choices: [
        { text: "Barriers to speaking up", next: "speaking_up" },
        { text: "Leadership accountability", next: "leadership" },
        { text: "Learning from incidents", next: "learning" }
      ],
      icon: Users
    },
    speaking_up: {
      title: "Breaking Down Barriers",
      content: "Staff reveal hesitation in raising concerns. How do you address this?",
      choices: [
        { text: "Establish confidential reporting", next: "safe_space_end" },
        { text: "Create anonymous feedback system", next: "reporting_end" },
        { text: "Develop cultural change program", next: "culture_end" }
      ],
      icon: Users
    }
  };

  const handleChoice = (next) => {
    if (next.endsWith('_end')) {
      setShowSummary(true);
      setCurrentSummary(next);
      setLearnedPoints(prev => new Set([...prev, summaries[next].title]));
      return;
    }
    
    setPathTaken([...pathTaken, currentScene]);
    setCurrentScene(next);
    if (scenes[currentScene]?.learning) {
      setLearnedPoints(prev => new Set([...prev, scenes[currentScene].learning]));
    }
  };

  const restart = () => {
    setCurrentScene('start');
    setPathTaken([]);
    setLearnedPoints(new Set());
    setShowSummary(false);
    setCurrentSummary(null);
  };

  const renderSummary = () => {
    const summary = summaries[currentSummary];
    if (!summary) return null;

    return (
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
          Journey Complete: {summary.title}
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              Key Learnings
            </h3>
            <ul className="space-y-2">
              {summary.keyLearnings.map((learning, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {learning}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <ArrowRight className="w-5 h-5 text-blue-500 mr-2" />
              Recommended Next Steps
            </h3>
            <ul className="space-y-2">
              {summary.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
              Ockenden Report Connection
            </h3>
            <p>{summary.ockendenLink}</p>
          </div>
        </div>

        <button 
          onClick={restart}
          className="w-full mt-6 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Start New Journey
        </button>
      </Card>
    );
  };

  const currentSceneData = scenes[currentScene];
  const Icon = currentSceneData?.icon || AlertCircle;

  if (!scenes[currentScene]) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
            Scene Not Found
          </h2>
          <p className="mb-4">Sorry, something went wrong with the journey.</p>
          <button 
            onClick={restart}
            className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Start New Journey
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!showSummary ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Icon className="w-8 h-8 text-blue-500 mr-4" />
            <h1 className="text-3xl font-bold">{scenes[currentScene].title}</h1>
          </div>

          <div className="mb-8">
            <p className="text-xl leading-relaxed">{scenes[currentScene].content}</p>
          </div>

          <div className="space-y-4">
            {scenes[currentScene].choices?.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice.next)}
                className="w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-500 transition-all flex items-center justify-between"
              >
                <span className="text-lg">{choice.text}</span>
                <ArrowRight className="w-5 h-5 text-blue-500" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        renderSummary()
      )}
    </div>
  );
};

export default Adventure;