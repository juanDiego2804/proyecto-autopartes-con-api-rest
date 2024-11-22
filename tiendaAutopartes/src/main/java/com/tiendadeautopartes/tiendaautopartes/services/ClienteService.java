package com.tiendadeautopartes.tiendaautopartes.services;

import com.tiendadeautopartes.tiendaautopartes.models.ClienteModel;
import com.tiendadeautopartes.tiendaautopartes.repositories.AutoparteRepository;
import com.tiendadeautopartes.tiendaautopartes.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    public ClienteModel saveCliente(ClienteModel cliente){
        return clienteRepository.save(cliente);
    }

    public Optional<ClienteModel> findClienteByTelefono(String telefono){
        return clienteRepository.findByTelefono(telefono);
    }
    public List<ClienteModel> getAllClientes(){
        return clienteRepository.findAll();
    }
}
