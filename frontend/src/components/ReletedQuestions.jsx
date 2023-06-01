import React from 'react'

const ReletedQuestions = ({ reletedQuestions }) => {

    return (
        <div>
            <div style={{ fontSize: '24px', fontStyle: 'bold', margin: '8px 0 5px 0' }}>Related Questions</div>
            <div style={{ border: '1px solid white', padding: '2px 5px', margin: '9px 0px' }}>
                {
                    reletedQuestions.map((_, i) => {
                        return (
                            <div key={i} style={{ textDecoration: 'underline', padding: '2px 5px', margin: '5px 0px' }}>
                                <div style={{ fontSize: '15px', margin: '5px 0 3px 0' }}>
                                    {
                                        reletedQuestions[i]
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default ReletedQuestions