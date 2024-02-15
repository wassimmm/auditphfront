import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

class Question {
  constructor(id, ordre, Ref, Question, categorie_id) {
    this.id = id;
    this.ordre = ordre;
    this.Ref = Ref;
    this.Question = Question;
    this.categorie_id = categorie_id;
  }
}

const QuestionScreen = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const { categoryId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch questions by categorie_id
        const responseQuestions = await axios.get(`http://10.0.2.2:8000/api/questions/${categoryId}`);
        if (responseQuestions.status === 200) {
          const quests = responseQuestions.data.questions.map(quest => new Question(quest.id, quest.ordre, quest.Ref, quest.Question, quest.categorie_id));
          setQuestions(quests);
        } else {
          console.log('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [categoryId]); // Include categorie_id in the dependency array

  const handleQuestionPress = (question) => {
    // Implement functionality for handling question press
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {/* <Text style={styles.title}>Customer Site:</Text>
          <Text style={styles.title}>{customerSiteStructure}</Text> */}
          <Text style={styles.subtitle}>Questions:</Text>
        </View>
      </View>
      <View style={styles.questionList}>
        {questions.map((quest, index) => (
          <TouchableOpacity
            key={index}
            style={styles.questionItem}
            onPress={() => handleQuestionPress(quest)}>
            <Text style={styles.questionItemText}>{quest.ordre}, {quest.Ref}, {quest.Question}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <CustomHeader />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#007bff',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'green',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  questionList: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'white',  // Set background color to white
  },
  questionItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  questionItemText: {
    fontSize: 18, // Set font size to make letters big
    color: 'black', // Set text color to black
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default QuestionScreen;
