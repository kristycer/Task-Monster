import React from 'react'
import { StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import axios from 'axios'
import { railsServer } from '../../serverAddress'
const CompletedButton = ({
  taskId,
  user,
  setTaskList,
  completed = true,
  score = 1,
  setScore,
}) => {
  function completeTask() {
    let body = {
      task: {
        completed: completed,
        score: score,
      },
    }
    let headers = {
      headers: {
        email: user.email,
        authentication_token: user.authentication_token,
      },
    }
    axios
      .patch(railsServer + '/tasks/' + taskId, body, headers)
      .then(() => {
        axios.get(railsServer + '/tasks', headers).then(async (res) => {
          await setTaskList(res.data)
          let scoreArray = res.data.map((task) => task.score)
          setScore(scoreArray.reduce((a, b) => a + b, 0))
        })
      })
      .catch((err) => console.log(err.message))
  }

  {
  }

  return (
    <TouchableOpacity
      style={(styles.backTextWhite, styles.backRightBtn, styles.backLeftBtn)}
      onPress={() => completeTask()}
      title=""
    >
      <Image source={require('../../assets/compl.png')} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backLeftBtn: {
    // backgroundColor: 'green',
    left: 0,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
})

export default CompletedButton
