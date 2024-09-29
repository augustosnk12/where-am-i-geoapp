import React from 'react';

export default function Card() {
    return (
        <div className="absolute top-24 right-4 h-[80vh] p-6 bg-white border rounded-lg shadow-lg z-[888] over overflow-auto no-scrollbar">
            <h1 className="text-2xl font-bold mb-4">Limoeiro - PE</h1>

            <div>
                <h2 className="text-lg font-semibold">Informações</h2>
                <ul className="list-disc pl-4 mt-2">
                    <li>quantidade de UBS</li>
                    <li>população</li>
                    <li>nome e contato do secretário</li>
                </ul>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold">Concorrentes</h2>

                <div className="mt-4">
                    <h3 className="font-semibold">Lorem ipsum:</h3>
                    <ul className="list-disc pl-4">
                        <li>data de início do contrato</li>
                        <li>data final do contrato</li>
                        <li>valor</li>
                        <li>serviço</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">Lorem ipsum:</h3>
                    <ul className="list-disc pl-4">
                        <li>data de início do contrato</li>
                        <li>data final do contrato</li>
                        <li>valor</li>
                        <li>serviço</li>
                    </ul>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold">Lorem ipsum:</h3>
                    <ul className="list-disc pl-4">
                        <li>data de início do contrato</li>
                        <li>data final do contrato</li>
                        <li>valor</li>
                        <li>serviço</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};