import React from 'react'

const TopResults = ({ users, questions, answers }) => {
    console.log(users, questions, answers);
    console.log(Array(users.length));


    return (
        <div>
            {
                users.map((_, i) => {
                    return (
                        <div key={i} style={{ border: '1px solid white', padding: '2px 5px', margin: '7px 0px' }}>
                            <div style={{ fontSize: '15px', fontStyle: 'bold', margin: '5px 0 3px 0' }}>
                                {
                                    questions[i]
                                }
                            </div>
                            <div style={{ fontStyle: 'italic' }}>
                                {
                                    users[i]
                                }
                            </div>
                            <div style={{ marginTop: '7px' }}>
                                {
                                    answers[i]
                                }
                            </div>
                        </div>
                    )

                })
            }

        </div>
    )
}

export default TopResults