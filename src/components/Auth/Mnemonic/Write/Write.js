import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MnemonicView from 'components/shared/MnemonicView';
import Button from 'components/shared/Button';
import Alert from 'components/shared/Alert';
import AlertCheckbox from 'components/shared/AlertCheckbox';

import {
  Container,
  Header,
  Title,
  Description,
  ContentContainer,
} from './styles';

class Write extends Component {
  static propTypes = {
    mnemonic: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    isAlertVisisble: false,
    isAlertChecked: false,
  };

  showAlert = () => {
    this.setState({ isAlertVisisble: true });
  };

  toggleCheckbox = () => {
    this.setState({ isAlertChecked: !this.state.isAlertChecked });
  };

  onCancel = () => {
    this.setState({ isAlertVisisble: false, isAlertChecked: false });
  };

  onComplete = () => {
    this.setState({ isAlertVisisble: false }, this.props.onComplete);
  };

  render() {
    const { isAlertVisisble, isAlertChecked } = this.state;
    const { t, mnemonic } = this.props;

    return (
      <Container>
        <Alert
          buttons={[
            <Button
              key="cancel"
              onPress={this.onCancel}
              padding={false}
              shape="square"
              title={t('mnemonic.write.alertButtonCancel').toUpperCase()}
              variant="text"
            />,

            <Button
              key="confirm"
              disabled={!isAlertChecked}
              onPress={this.onComplete}
              padding={false}
              shape="square"
              title={t('mnemonic.write.alertButtonConfirm').toUpperCase()}
              variant="text"
            />,
          ]}
          isVisible={isAlertVisisble}
          text={t('mnemonic.write.alertMessage')}
          title={t('mnemonic.write.alertTitle')}
        >
          <AlertCheckbox
            isChecked={isAlertChecked}
            label={t('mnemonic.write.alertUnderstand')}
            onPress={this.toggleCheckbox}
          />
        </Alert>

        <Header>
          <Title>{t('mnemonic.write.title')}</Title>
          <Description>{t('mnemonic.write.description')}</Description>
        </Header>

        <ContentContainer>
          <MnemonicView mnemonic={mnemonic} withCopyButton />
        </ContentContainer>

        <Button
          onPress={this.showAlert}
          title={t('mnemonic.write.continueButton')}
        />
      </Container>
    );
  }
}

export default Write;
