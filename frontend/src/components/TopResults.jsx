import React from 'react'

const TopResults = ({ results }) => {



    return (
        <div>
            {
                results.map((result, i) => {
                    return (
                        <div key={i} style={{ border: '1px solid white', padding: '2px 5px', margin: '7px 0px' }}>
                            <div style={{ fontSize: '15px', fontStyle: 'bold', margin: '5px 0 3px 0' }}>
                                {
                                    result.question
                                }
                            </div>
                            <div style={{ fontStyle: 'italic' }}>
                                {
                                    result.user
                                }
                            </div>
                            <div style={{ marginTop: '7px' }}>
                                {
                                    result.answer
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