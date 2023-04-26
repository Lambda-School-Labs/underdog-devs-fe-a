import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './ApplicationModal.less';
import { Modal, Button } from 'antd';
import MenteeModal from './MenteeModal';
import MentorModal from './';
import { setCurrentApplication } from '../../../state/actions/applications/setCurrentApplication';

import { handleApplication } from '../../../state/actions/applications/handleApplications';

const ApplicationModal = ({
  profileId,
  setProfileId,
  setDisplayModal,
  displayModal,
  applicationProfile,
  dispatch,
  currentApplication,
}) => {
  const handleOk = () => {
    setDisplayModal(false);
    setDisplayModal(true);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setProfileId(''); //? Do we need this? I'm thinking no...
  };

  useEffect(() => {
    const getCurrentApp = () => {
      // eslint-disable-next-line array-callback-return
      Object.values(applicationProfile).map(current_id => {
        if (current_id?.key === profileId) {
          dispatch(setCurrentApplication(current_id));
        }
      });
    };
    getCurrentApp();
  }, [applicationProfile, profileId]);

  return (
    <>
      {currentApplication?.key === undefined ? (
        <Modal
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          footer={null}
        >
          Application not found
        </Modal>
      ) : (
        <Modal
          title="Review Application"
          visible={displayModal}
          onOk={handleOk}
          onCancel={handleCancel}
          afterClose={handleCancel}
          className={
            currentApplication.role_name === 'mentee'
              ? 'modalStyleMentee'
              : 'modalStyleMentor'
          }
          footer={[
            <Button
              key="submitA"
              type="primary"
              onClick={() =>
                handleApplication(`${currentApplication.role_name}`, 'approved')
              }
            >
              Approve
            </Button>,
            <Button
              key="submitR"
              onClick={() =>
                dispatch(
                  handleApplication(`${currentApplication.role_name}`, 'reject')
                )
              }
              danger
            >
              Reject
            </Button>,
          ]}
        >
          {currentApplication.role_name === 'mentee' ? (
            <MenteeModal applicant={currentApplication} />
          ) : (
            <MentorModal applicant={currentApplication} />
          )}
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentApplication: state.user.currentApplication,
  };
};

export default connect(mapStateToProps)(ApplicationModal);
