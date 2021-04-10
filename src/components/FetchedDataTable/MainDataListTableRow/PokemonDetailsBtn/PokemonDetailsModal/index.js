import React, {useState} from 'react'
import {Button, Card, Modal} from 'react-bootstrap'
import s from '../PokemonDetailsModal/pokemonDetailsModal.module.scss'
import noneAvatar from '../PokemonDetailsModal/noneAvatar.png'

const PokemonDetailsModal = ({isLoading, pokemonDetails, setModalShow, ...props}) => {
  const [isLoadedMainImage, setIsLoadedMainImage] = useState(false)
  const Ability = ({ability}) => <><span className='lh-sm'>{ability}</span><br/></>
  const abilities = pokemonDetails ? pokemonDetails.abilities.map(el => <Ability key={el} ability={el}/>) : ''
  const AvatarHolder = ({visibility = true}) =>
      <Card.Img src={noneAvatar}
                alt='Avatar'
                className={visibility ? `${s.size}` : `${s.size} invisible d-none`}
      />
  return (
      <Modal
          {...props}
          backdrop={'static'}
          size='sm'
          aria-labelledby='contained-modal-title-vcenter'
          centered
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            Pokemon Details:
          </Modal.Title>
          <button onClick={e => {
            e.stopPropagation()
            setModalShow(false)
          }} type='button' className='btn-close'
                  data-bs-dismiss='modal' aria-label='Close'/>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <AvatarHolder visibility={!isLoadedMainImage}/>
            <Card.Img src={pokemonDetails ? pokemonDetails.avatarUrl : ''}
                      alt='Avatar'
                      className={`${s.size} invisible d-none`}
                      onLoad={e => {
                        e.target.classList.remove('invisible', 'd-none')
                        setIsLoadedMainImage(true)
                      }}
            />
            <Card.Body>
              <Card.Title className='text-capitalize fw-bold fs-5'
              >{pokemonDetails ? pokemonDetails.name : ''}</Card.Title>
              <Card.Title className='fw-bold'>Abilities:</Card.Title>
              <Card.Text className='text-capitalize'>
                {abilities}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e => {
            e.stopPropagation()
            setModalShow(false)
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}
export default PokemonDetailsModal