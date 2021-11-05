import React from 'react'
import students from '../data/students.json'

const IndexPage = () => {
  return (
    <div style={{ background: '#fff', padding: '2em' }}>
      <div style={{ padding: '0 0 2em 0' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tempora
        laudantium cum cumque recusandae pariatur explicabo incidunt magnam,
        velit blanditiis sed asperiores optio laborum fuga dolorem quaerat odio
        non quam.
      </div>
      <div
        id="student-projects-index-page"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
      >
        {students.map((student, index) => (
          <div key={student.projectId + '-' + index}>
            <strong>{student.name || 'Student'}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndexPage
