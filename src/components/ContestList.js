import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

const ContestList = ({contests, onContestClick}) => (
    <div className="ContestList">
        <div>
                {contests.map(contest =>
                <ContestPreview 
                onClick={onContestClick}
                key={contest.id} {...contest} /> 
                )}
        </div>
    </div>
)

ContestList.propTypes = {
    contests: PropTypes.array,
    onContestClick: PropTypes.func.isRequired
};

export default ContestList;